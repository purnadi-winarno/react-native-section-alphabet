import * as React from "react";
import { SectionList, View, Text, SectionListData } from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import getSectionData from "./utilities/getSectionData";
import ListLetterIndex from "./components/ListLetterIndex";
import IData from "./interfaces/IData";
import ISectionData from "./interfaces/ISectionData";
import IAlphabetListProps from "./interfaces/IAlphabetListProps";
import styles from "./styles/AlphabetListStyle";
import sizes from "./values/sizes";
import { debounce } from "ts-debounce";

export default class AlphabetList extends React.PureComponent<IAlphabetListProps> {
  state: {
    sectionData: ISectionData[];
    optimizedData: ISectionData[];
    alphabetSelectedIndex: number;
    selectedLetter: string;
  } = {
    sectionData: [],
    optimizedData: [],
    alphabetSelectedIndex: 0,
    selectedLetter: "A",
  };

  sectionList!: SectionList;
  onGetItemLayout: any;

  constructor(props: IAlphabetListProps) {
    super(props);

    const { getItemHeight: onGetItemHeight = () => sizes.itemHeight, sectionHeaderHeight = sizes.itemHeight } = props;

    this.onGetItemLayout = sectionListGetItemLayout({
      getItemHeight: (_rowData: any, sectionIndex: number, rowIndex: number) =>
        onGetItemHeight({ sectionIndex, rowIndex }),
      getSectionHeaderHeight: () => sectionHeaderHeight,
      getSectionFooterHeight: () => 0,
    });
  }

  componentDidMount() {
    this.setSectionData();
  }

  componentDidUpdate(prevProps: IAlphabetListProps) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setSectionData();
    }
  }

  private setSectionData = () => {
    const { data = [] } = this.props;
    const sectionData = getSectionData(data);
    const self = this;

    this.setState({ sectionData }, () => {
      const optimizedData = sectionData?.filter((section) => section?.data?.length > 0);

      self.setState({ optimizedData });
    });
  };

  private onScrollToSection = (item: ISectionData, sectionIndex: number) => {
    if (!this.sectionList) {
      return;
    }

    if (item?.index === null) {
      this.setState({ alphabetSelectedIndex: sectionIndex });
      this.setState({ selectedLetter: item?.title });
    } else {
      this.sectionList.scrollToLocation({
        sectionIndex: item?.index ?? 0,
        itemIndex: 0,
        animated: false,
      });
      this.setState({ alphabetSelectedIndex: sectionIndex });
      this.setState({ selectedLetter: item?.title });
    }
  };

  private onSetSectionListRef = (sectionList: SectionList) => {
    if (!sectionList) {
      return;
    }

    this.sectionList = sectionList;
  };

  private onRenderItem = ({ item }: { item: IData }) => {
    const { renderItem } = this.props;

    if (renderItem) {
      return renderItem(item);
    }

    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemLabel}>{item.value}</Text>
      </View>
    );
  };

  private onRenderSectionHeader = ({ section }: { section: SectionListData<IData> }) => {
    if (!section?.data?.length) return null;

    const { renderSectionHeader } = this.props;

    if (renderSectionHeader) {
      return renderSectionHeader(section);
    }

    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
      </View>
    );
  };

  private _onViewableItemsChanged = ({ viewableItems }: any) => {
    const _self = this;
    if ((viewableItems?.length ?? 0) > 0) {
      const selectedLetter = viewableItems[0]?.item?.title;
      _self.setState({ selectedLetter });
    }
  };

  private viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  };

  render() {
    const { selectedLetter, optimizedData } = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        <SectionList
          {...this.props}
          ref={this.onSetSectionListRef}
          stickySectionHeadersEnabled={true}
          sections={optimizedData}
          keyExtractor={(item: IData) => item.key}
          renderItem={this.onRenderItem}
          renderSectionHeader={this.onRenderSectionHeader}
          getItemLayout={this.onGetItemLayout}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={100}
          removeClippedSubviews={false}
          onViewableItemsChanged={debounce(this._onViewableItemsChanged, 1000)}
          viewabilityConfig={this.viewabilityConfig}
          onScrollEndDrag={(e) => console.log("e: ", e)}
        />

        <ListLetterIndex
          selectedLetter={selectedLetter}
          sectionData={this.state.sectionData}
          onPressLetter={this.onScrollToSection}
          indexLetterColor={this.props.indexLetterColor}
          indexLetterSize={this.props.indexLetterSize}
          letterIndexWidth={this.props.letterIndexWidth}
          containerStyle={this.props.containerStyle}
          alphabetContainer={this.props.alphabetContainer}
          selectedLetterItemStyle={this.props.selectedLetterItemStyle}
        />
      </View>
    );
  }
}
