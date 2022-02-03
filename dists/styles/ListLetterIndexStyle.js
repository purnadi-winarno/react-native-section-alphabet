"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var sizes = {
  containerWidth: 20,
  itemHeight: 15,
  itemFontSize: 16,
}
var styles = {
  letterIndexContainer: {
    width: sizes.containerWidth,
    // height: "100%",
    position: "absolute",
    right: 5,
    padding: 5,
  },
  letterIndexList: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // height: "100%",
  },
  letterIndexItem: {
    width: sizes.containerWidth,
    height: sizes.itemHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  letterIndexLabel: {
    fontSize: sizes.itemFontSize,
    fontWeight: "bold",
    color: "grey",
  },
}
exports.default = styles
