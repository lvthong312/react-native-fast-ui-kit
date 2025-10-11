import type { TextStyle, ViewStyle } from "react-native";

interface IDefaultStyle {
    text: {
        style: TextStyle;
    };
    button: {
        style: ViewStyle;
        titleStyle: TextStyle
    };
}
interface IFastUIKit {
    defaultStyle: IDefaultStyle;
}
export class FastUIKit {
    static defaultStyle: IDefaultStyle = {
        text: {
            style: {},
        },
        button: {
            style: {},
            titleStyle: {}
        },
    };
    static init(props: IFastUIKit) {
        this.defaultStyle = props?.defaultStyle;
    }
}