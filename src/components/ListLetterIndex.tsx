import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import ISectionData from "../interfaces/ISectionData";
import styles from "../styles/ListLetterIndexStyle";

interface Props {
  /**
   * Goes to the specific letter location on press
   *
   * @param sectionIndex - The section alphabet index
   *
   */
  onPressLetter: (item: ISectionData, sectionIndex: number) => void;
  /** The array of objects data with value and key. */
  sectionData: ISectionData[];
  /** The alphabet letter color. */
  indexLetterColor?: string;
  /** The alphabet letter font-size. */
  indexLetterSize?: number;
  /** The alphabet letter index width size. */
  letterIndexWidth?: number;
  /** The container letter item style. */
  selectedLetterItemStyle?: any;
  /** The alphabet wrapper container style. */
  containerStyle?: any;
  /** The flatlist alphabet container style. */
  alphabetContainer?: any;

  selectedLetter?: string;
}

export default class ListLetterIndex extends React.PureComponent<Props> {
  getComputedLabelStyle() {
    const props = this.props;

    if (props) {
      return {
        color: props.indexLetterColor,
        fontSize: props.indexLetterSize,
      };
    }
  }

  getWidthContainerStyle() {
    const props = this.props;

    if (props) {
      return {
        width: props.letterIndexWidth,
        ...props.containerStyle,
      };
    }
  }

  getLetterItemStyle() {
    const { selectedLetterItemStyle } = this.props;

    if (selectedLetterItemStyle) {
      return {
        ...selectedLetterItemStyle,
      };
    }
  }

  renderLetterItem = ({ item, index }: { item: ISectionData; index: number }) => {
    const computedLabelStyle = this.getComputedLabelStyle();
    const computedItemStyle = this.getLetterItemStyle();

    return (
      <TouchableOpacity onPress={() => this.props.onPressLetter(item, index)}>
        <View style={[styles.letterIndexItem, item?.title === this.props.selectedLetter && computedItemStyle]}>
          <Text style={[styles.letterIndexLabel, item?.title === this.props.selectedLetter && computedLabelStyle]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const computedWidthStyle = this.getWidthContainerStyle();
    const { alphabetContainer } = this.props;

    return (
      <View style={[styles.letterIndexContainer, computedWidthStyle]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View>
            <FlatList
              contentContainerStyle={[styles.letterIndexList, alphabetContainer]}
              // ItemSeparatorComponent={() => (
              //   <View style={{ height: 10, width: 1 }} />
              // )}
              data={this.props.sectionData}
              renderItem={this.renderLetterItem}
              keyExtractor={(i) => i.title}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    );
  }
}
