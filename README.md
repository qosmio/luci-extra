<div align="center">

# LuCI Extra

### Premium LuCI Packages for OpenWrt

Custom LuCI packages optimized for Qualcomm IPQ807x/IPQ60xx platforms and beyond.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![OpenWrt](https://img.shields.io/badge/OpenWrt-Compatible-00B5E2.svg)](https://openwrt.org)
[![Platform](https://img.shields.io/badge/Platform-IPQ807x%20%7C%20IPQ60xx-orange.svg)]()

---

</div>

## Overview

**LuCI Extra** provides a curated collection of custom LuCI packages designed to enhance your OpenWrt router experience. Originally developed for Qualcomm IPQ807x and IPQ60xx platforms, these packages extend the capabilities of your router's web interface with advanced features and improved usability.

## Features

- **Platform Optimized**: Tailored for high-performance Qualcomm IPQ807x/IPQ60xx routers
- **Easy Integration**: Seamlessly integrates with OpenWrt's feed system
- **Active Development**: Regularly updated with new features and improvements
- **Community Driven**: Open source and welcoming contributions

## Installation

### Adding to OpenWrt Feeds

To add this repository to your OpenWrt build system, you'll need to modify your `feeds.conf` or `feeds.conf.default` file.

#### Step 1: Locate Your Feeds Configuration

In your OpenWrt build directory, find the feeds configuration file:

```bash
cd /path/to/openwrt
```

The file is typically named `feeds.conf.default`. If you've already customized your feeds, you may have a `feeds.conf` file.

#### Step 2: Add the LuCI Extra Feed

Open the feeds configuration file and add the following line:

```conf
src-git luciextra https://github.com/qosmio/luci-extra.git
```

**Complete Example** (`feeds.conf.default`):

```conf
src-git packages https://git.openwrt.org/feed/packages.git
src-git luci https://git.openwrt.org/project/luci.git
src-git routing https://git.openwrt.org/feed/routing.git
src-git telephony https://git.openwrt.org/feed/telephony.git
src-git luciextra https://github.com/qosmio/luci-extra.git
```

#### Step 3: Update and Install Feeds

After adding the feed, update your feeds and install the packages:

```bash
./scripts/feeds update -a
./scripts/feeds install -a
```

Or, to specifically update and install only the LuCI Extra feed:

```bash
./scripts/feeds update luciextra
./scripts/feeds install -a -p luciextra
```

#### Step 4: Configure Packages

Run the OpenWrt configuration menu to select the packages you want to include:

```bash
make menuconfig
```

Navigate to **LuCI → Applications** or the relevant package category to find and select the LuCI Extra packages.

#### Step 5: Build

Build your OpenWrt firmware with the selected packages:

```bash
make -j$(nproc)
```

### For Existing OpenWrt Installations

If you're running OpenWrt on a device and want to add packages without rebuilding, you can set up a custom package feed or build individual packages as IPKs and install them via opkg.

## Screenshots

### Main Interface

<!-- Screenshot placeholder: Add screenshot of main interface here -->
![Main Interface](docs/screenshots/main-interface.png)

*The enhanced LuCI interface with custom packages enabled*

### Configuration Panel

<!-- Screenshot placeholder: Add screenshot of configuration panel here -->
![Configuration Panel](docs/screenshots/config-panel.png)

*Easy-to-use configuration panels for advanced features*

### Package Selection

<!-- Screenshot placeholder: Add screenshot of package selection in menuconfig here -->
![Package Selection](docs/screenshots/package-selection.png)

*Finding LuCI Extra packages in OpenWrt menuconfig*

## Available Packages

This repository contains various LuCI packages designed to extend your router's functionality. Packages are continuously being added and updated.

> **Note**: Package list is dynamically maintained. Check the repository for the latest additions.

## Usage

Once installed, the LuCI Extra packages will be accessible through your router's web interface. Navigate to the relevant sections in LuCI to configure and use the new features.

### Accessing LuCI

1. Open your web browser
2. Navigate to your router's IP address (typically `http://192.168.1.1`)
3. Log in with your credentials
4. Find the new features under their respective menu sections

## Development

### Building from Source

Clone the repository and integrate it into your OpenWrt build environment as described in the Installation section.

### Project Structure

```
luci-extra/
├── LICENSE              # Apache 2.0 License
├── README.md           # This file
└── [packages]/         # Individual package directories
```

## Compatibility

- **OpenWrt Version**: 21.02 and later recommended
- **Primary Platforms**: IPQ807x, IPQ60xx
- **Architecture**: ARM64, ARM
- **Additional Platforms**: May work on other platforms (community testing welcome)

## Contributing

Contributions are welcome! Whether it's bug reports, feature requests, or code contributions, your input helps make this project better.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub with:

- Clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Your OpenWrt version and platform
- Relevant log outputs

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The OpenWrt community for their excellent work on the platform
- Contributors who have helped improve this project
- Users who provide valuable feedback and testing

---

## Support This Project

If you find LuCI Extra useful and want to support its continued development, consider making a donation:

<div align="center">

### Buy Me a Coffee

Your support helps maintain and improve this project.

[![Donate](https://img.shields.io/badge/Donate-Support%20Development-brightgreen.svg)](https://github.com/sponsors/qosmio)

**Bitcoin**: `[Your BTC Address Here]`  
**Ethereum**: `[Your ETH Address Here]`  
**PayPal**: `[Your PayPal Link Here]`

</div>

---

<div align="center">

**Made with dedication for the OpenWrt community**

[Report Bug](https://github.com/qosmio/luci-extra/issues) · [Request Feature](https://github.com/qosmio/luci-extra/issues) · [Documentation](https://github.com/qosmio/luci-extra/wiki)

</div>
