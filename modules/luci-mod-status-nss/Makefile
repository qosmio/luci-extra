#
# Copyright (C) 2025 Sean Khan <datapronix@protonmail.com>
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI Status (NSS)
LUCI_DESCRIPTION:=Extended status page for NSS devices. Displays UBI core load, and CPU/WIFI/UBI temps
LUCI_DEPENDS:=+luci-base +luci-mod-status +kmod-qca-nss-drv @TARGET_qualcommax

PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

include $(TOPDIR)/feeds/luci/luci.mk


# call BuildPackage - OpenWrt buildroot signature

