import localFont from "next/font/local";

const Gilroy = localFont({
    src: [
        { path: "../../../assets/fonts/Gilroy-ExtraBold.otf", weight: "900" },
        { path: "../../../assets/fonts/Gilroy-Light.otf", weight: "200" },
    ],
});

const QuickSand = localFont({
    src: [
        { path: "../../../assets/fonts/Quicksand-Light.ttf", weight: "200" },
        { path: "../../../assets/fonts/Quicksand-Medium.ttf", weight: "300" },
        { path: "../../../assets/fonts/Quicksand-Regular.ttf", weight: "400" },
        { path: "../../../assets/fonts/Quicksand-SemiBold.ttf", weight: "600" },
        { path: "../../../assets/fonts/Quicksand-Bold.ttf", weight: "900" },
    ],
});

const BankGothic = localFont({
    src: [
        { path: "../../../assets/fonts/bankgothic-regular.ttf", weight: "200" }
    ],
});

export { BankGothic, Gilroy, QuickSand };
