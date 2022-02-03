import * as React from "react";
import ISectionData from "../interfaces/ISectionData";
interface Props {
    /**
     * Goes to the specific letter location on press
     *
     * @param sectionIndex - The section alphabet index
     *
     */
    onPressLetter: (sectionIndex: number) => void;
    /** The array of objects data with value and key. */
    sectionData: ISectionData[];
    /** The alphabet letter color. */
    indexLetterColor?: string;
    /** The alphabet letter font-size. */
    indexLetterSize?: number;
    /** The alphabet letter index width size. */
    letterIndexWidth?: number;
    /** The container letter item style. */
    letterItemStyle?: any;
    /** The alphabet wrapper container style. */
    containerStyle?: any;
    /** The flatlist alphabet container style. */
    alphabetContainer?: any;
}
export default class ListLetterIndex extends React.PureComponent<Props> {
    getComputedLabelStyle(): {
        color: string | undefined;
        fontSize: number | undefined;
    } | undefined;
    getWidthContainerStyle(): any;
    getLetterItemStyle(): any;
    renderLetterItem: ({ item, index }: {
        item: ISectionData;
        index: number;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
