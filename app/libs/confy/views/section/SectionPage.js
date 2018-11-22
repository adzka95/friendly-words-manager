import React from "react"
import {View, Content, Text} from "native-base"
import {withLink} from "../../libs/withState"
import {Col, Row, Grid} from 'react-native-easy-grid';
import {moderateScale} from "../../../scaling";
import firebase from "react-native-firebase";
import {events} from "../../../../components/firebase/Events";

const sectionPageStyle = {
    sections: {
        backgroundColor: "rgba(63, 81, 181, 0.1)",
        justifyContent: "center"
    },

    sectionListItem: {
        padding: moderateScale(10),
        marginVertical: moderateScale(5)
    },

    activeSectionListItem: {
        backgroundColor: "#fff",
    },

    section: {
        padding: moderateScale(30)
    }
}

const Section = ({children}) => (
    <Content contentContainerStyle={sectionPageStyle.section}>
        {children}
    </Content>
)

const _SectionPage =
    ({sections, renderField, config, activeSectionIdx, activeSectionIdxChange}) =>
        <Grid style={sectionPageStyle.container}>
            <Col style={sectionPageStyle.sections} size={30}>
                {sections.map((section, idx) => {
                    const isActive = activeSectionIdx === idx
                    return <View
                        style={[sectionPageStyle.sectionListItem, isActive && sectionPageStyle.activeSectionListItem]}
                        key={section.name}>
                        <Text style={{fontSize: moderateScale(12)}} onPress={() => {
                            activeSectionIdxChange(idx)
                            switch (idx) {
                                case 0:
                                    return (firebase.analytics().logEvent(events.change_tab_step_option))
                                case 1:
                                    return (firebase.analytics().logEvent(events.change_tab_try_option))
                                case 2:
                                    return (firebase.analytics().logEvent(events.change_tab_tip_option))
                            }
                        }}>
                            {section.name}
                        </Text>
                    </View>
                })
                }
            </Col>
            <Col style={{justifyContent: "center"}} size={70}>
                <Section>
                    {sections[activeSectionIdx].fields.map(renderField)}
                </Section>
            </Col>
        </Grid>


export const SectionPage = withLink("activeSectionIdx", 0)(_SectionPage);

