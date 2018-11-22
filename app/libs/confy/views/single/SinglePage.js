import React from "react"
import {View} from "native-base"
import firebase from "react-native-firebase";
import {events} from "../../../../components/firebase/Events";
import {ConfigurationModel as fields} from "../../../../config/model";

export const SinglePage = ({field, renderField, config}) => {
    firebase.analytics().logEvent(events.change_tab_material)
    return (
        <View style={{flex: 1}}>
            {renderField(field)}
        </View>
    )
}
