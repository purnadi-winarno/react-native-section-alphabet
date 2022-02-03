"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var ListLetterIndexStyle_1 = __importDefault(require("../styles/ListLetterIndexStyle"));
var ListLetterIndex = /** @class */ (function (_super) {
    __extends(ListLetterIndex, _super);
    function ListLetterIndex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderLetterItem = function (_a) {
            var item = _a.item, index = _a.index;
            var computedLabelStyle = _this.getComputedLabelStyle();
            var computedItemStyle = _this.getLetterItemStyle();
            return (<react_native_1.TouchableOpacity onPress={function () { return _this.props.onPressLetter(index); }}>
        <react_native_1.View style={[ListLetterIndexStyle_1.default.letterIndexItem, computedItemStyle]}>
          <react_native_1.Text style={[ListLetterIndexStyle_1.default.letterIndexLabel, computedLabelStyle]}>{item.title}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>);
        };
        return _this;
    }
    ListLetterIndex.prototype.getComputedLabelStyle = function () {
        var props = this.props;
        if (props) {
            return {
                color: props.indexLetterColor,
                fontSize: props.indexLetterSize
            };
        }
    };
    ListLetterIndex.prototype.getWidthContainerStyle = function () {
        var props = this.props;
        if (props) {
            return __assign({ width: props.letterIndexWidth }, props.containerStyle);
        }
    };
    ListLetterIndex.prototype.getLetterItemStyle = function () {
        var letterItemStyle = this.props.letterItemStyle;
        if (letterItemStyle) {
            return __assign({}, letterItemStyle);
        }
    };
    ListLetterIndex.prototype.render = function () {
        var computedWidthStyle = this.getWidthContainerStyle();
        var alphabetContainer = this.props.alphabetContainer;
        return (<react_native_1.View style={[ListLetterIndexStyle_1.default.letterIndexContainer, computedWidthStyle]}>
        <react_native_1.FlatList contentContainerStyle={[ListLetterIndexStyle_1.default.letterIndexList, alphabetContainer]} data={this.props.sectionData} renderItem={this.renderLetterItem} keyExtractor={function (i) { return i.title; }}/>
      </react_native_1.View>);
    };
    return ListLetterIndex;
}(React.PureComponent));
exports.default = ListLetterIndex;
