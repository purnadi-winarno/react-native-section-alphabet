const sizes = {
  containerWidth: 16,
  itemHeight: 15,
  itemFontSize: 8,
};

const styles: any = {
  letterIndexContainer: {
    width: sizes.containerWidth,
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 5,
    padding: 5,
  },

  letterIndexList: {
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },

  letterIndexItem: {
    width: sizes.containerWidth,
    height: sizes.containerWidth,
    alignItems: "center",
    justifyContent: "center",
  },

  letterIndexLabel: {
    fontSize: sizes.itemFontSize,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.5)",
  },
};

export default styles;
