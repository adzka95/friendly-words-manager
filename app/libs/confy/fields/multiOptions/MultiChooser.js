// @flow
import React from "react"
import {View} from "native-base";
import {FieldProps} from "../fields";
import {StyleSheet} from "react-native";
import {MultiOptions, SimpleOption} from "../../components/ui/MultiOptions";

type MultiChooserProps = {
    options: Array<string>
} & FieldProps<Array<string>>

export const MultiChooser = ({value, onChange, options}: MultiChooserProps) =>
        <MultiOptions style={styles.container} value={value} onChange={onChange}>
            {options.map(option => <SimpleOption key={option} value={option} label={option} />)}
        </MultiOptions>


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    }
});