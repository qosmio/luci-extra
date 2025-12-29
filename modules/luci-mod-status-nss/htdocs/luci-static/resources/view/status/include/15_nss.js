"require baseclass";
"require fs";
"require rpc";

const callSystemInfo = rpc.declare({
  object: "system",
  method: "info",
});

const getThermalZones = async () => {
  const dirs = await fs.list("/sys/class/thermal");
  const thermalZones = await Promise.all(
    dirs
      .filter((dir) => dir.name.startsWith("thermal_zone"))
      .map(async (dir) => {
        const typeFile = `/sys/class/thermal/${dir.name}/type`;
        const tempFile = `/sys/class/thermal/${dir.name}/temp`;
        try {
          const [typeName, tempStr] = await Promise.all([
            fs.read(typeFile),
            fs.read(tempFile),
          ]);
          const temp =
            Number.parseInt(tempStr.trim().replace(/\D/g, ""), 10) / 1000;
          if (Number.isNaN(temp)) throw new Error("Invalid temperature value");
          let category;
          if (/^cpu/.test(typeName)) category = "CPU";
          else if (/^nss/.test(typeName)) category = "Core";
          else if (/^wcss/.test(typeName)) category = "WiFi";
          if (category) return { category, temp };
        } catch (err) {
          console.warn(
            `Warning: Error reading files in ${dir.name}: ${err.message}`,
          );
        }
      }),
  );
  return thermalZones.filter(Boolean);
};

const processThermalZones = (thermalZones) => {
  const result = thermalZones.reduce((acc, { category, temp }) => {
    const data = acc[category] || { min: temp, max: temp, sum: 0, count: 0 };
    data.min = Math.min(data.min, temp);
    data.max = Math.max(data.max, temp);
    data.sum += temp;
    data.count += 1;
    acc[category] = data;
    return acc;
  }, {});
  return Object.fromEntries(
    Object.entries(result).map(([category, data]) => [
      category,
      {
        min: `${data.min.toFixed(1)}°`,
        avg: `${(data.sum / data.count).toFixed(1)}°`,
        max: `${data.max.toFixed(1)}°`,
      },
    ]),
  );
};

const mergeData = (data) => {
  return data.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});
};

const createSection = (title, data) => {
  const fields = data
    ? Object.keys(data).flatMap((category) => {
        return [
          _(category),
          L.isObject(data) && data[category]
            ? E(
                "div",
                { class: "label-grp" },
                Object.entries(data[category]).flatMap(([key, value]) => {
                  return [
                    E("span", { class: "label-l" }, [key]),
                    E("span", { class: "label-r bg-primary" }, [value]),
                  ];
                }),
              )
            : E("td", {}, "?"),
        ];
      })
    : [];
  const table = E("table", { class: "table" });
  const style = document.createElement("style");
  style.innerHTML = `
		.label-grp {
			display: inline-flex;
			flex-wrap: wrap;
			width: auto;
			margin: 3px 0 0 0;
			border-radius: 4px;
			color: var(--text-color-highest);
			border: 1px solid var(--border-color-high);
		}
		.tr > .td.left:first-child {
			width: 33%;
		}
		.label-l,
		.label-r {
			display: inline-block;
			padding: 0 5px 0 5px
		}
		.label-r {
			min-width: 40px;
			text-align: center
		}
		.label-grp .label-r.bg-primary {
			color: var(--on-primary-color);
		}
		:root[data-darkmode="true"] {
		.label-grp {
			text-shadow: 2px 0 1px hsl(var(--border-color-low-hsl))
		  }
		.label-r {
			color: var(--text-color-highest);
		  }
		}
		.bg-primary { background-color: var(--primary-color-medium) }
		.bg-warn { background-color: var(--warn-color-low) }
		.bg-error { background-color: var(--error-color-high) }
		.bg-success { background-color: var(--success-color-high) }

		@media screen and (max-width: 600px) {
			.label-grp {margin:0; display: flex; width: 100%;}
			.label-td {overflow: visible; padding: 0px 3px 0px 3px}
			.tr { display: flex; flex-direction: column; width: 100%; padding-bottom: 10px; }
			.td.left { width: 100% !important; display: block; padding: 2px 0; }
			.label-l { flex-grow: 1; }
			.label-r { flex-grow: 0; }
		}
	`;
  table.appendChild(style);

  for (let i = 0; i < fields.length; i += 2) {
    table.appendChild(
      E("tr", { class: "tr" }, [
        E("td", { class: "td left" }, [fields[i]]),
        E("td", { class: "td left label-td" }, [fields[i + 1] || "?"]),
      ]),
    );
  }

  return E("div", {}, [E("h3", {}, [title]), table]);
};

return baseclass.extend({
  title: "",
  load: () =>
    Promise.all([
      fs
        .lines("/sys/kernel/debug/qca-nss-drv/stats/cpu_load_ubi")
        .then((lines) => {
          const statLine = lines.find((line) => line.includes("%"));
          if (statLine) {
            const [min, avg, max] = statLine.split(/\s+/);
            return { Load: { min, avg, max } };
          }
        }),
      getThermalZones().then(processThermalZones),
    ]).then((data) => mergeData(data)),
  render: (data) => {
    const loadSection = createSection(_("NSS"), { Load: data.Load });
    const { Load, ...thermalData } = data;
    const tempSection = createSection(_("Thermal"), thermalData);
    return E("div", {}, [
      E("div", {}, [loadSection]),
      E("div", {}, [tempSection]),
    ]);
  },
});
