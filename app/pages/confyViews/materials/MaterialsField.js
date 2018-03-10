import React from "react"
import {Button, Icon, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"
import {Field} from "../../../libs/confy/fields/fields"
import {ScrollView} from "react-native"
import styles from "./styles"
import {styled} from "../../../libs/styled"
import {connect} from "react-redux"
import {Modal} from "../../../components/modal/Modal"
import {Model} from "../../../libs/confy/models"
import {ActionItem} from "../../../components/containers/ActionsMenu"
import {Cell, Row, Table} from "../../../components/table/Table"


const onWordAddClick = (resources, onSubmit) =>
    Modal.show(
        <View>
            <Text>Wybierz słowo, które chcesz dodać</Text>
            <ScrollView style={{marginTop: 10}}>
                <List>
                    {resources
                        .map(resource => (
                            <ListItem onPress={() => {
                                Modal.hide()
                                onSubmit(resource)
                            }}>
                                <Text>{resource.name}</Text>
                            </ListItem>
                        ))}
                </List>
            </ScrollView>
        </View>
    )

const AddButton = styled(Button, {
    position: "absolute",
    right: 0,
    bottom: 0,
})

const createNewMaterial = R.curry((model, word) => ({
    ...model.getDefaultConfig(),
    word
}))

const onFieldChange = R.curry((onChange, currentValue, index, fieldName, newValue) => onChange(R.set(
    R.lensPath([index, fieldName]),
    newValue,
    currentValue
)))

const _MaterialsArrayInput = ({value, onChange, resources, materialModel}) => (
    <View style={styles.container}>
        <View style={styles.listContainer}>
            <View>
                <Table>
                    <Row style={styles.tableHeader}>
                        <Cell><Text>Słowo</Text></Cell>
                        <Cell><Text>W uczeniu</Text></Cell>
                        <Cell><Text>W teście</Text></Cell>
                        <Cell><Text>Usuń</Text></Cell>
                    </Row>
                    {value.map((material, index) => (
                        <Row key={material.word.name}>
                            <Cell><Text>{material.word.name}</Text></Cell>
                            <Cell>
                                {materialModel.fields.isInLearningMode.renderField(
                                    R.always(material.isInLearningMode),
                                    onFieldChange(onChange, value, index)
                                )}
                            </Cell>
                            <Cell>
                                {materialModel.fields.isInTestMode.renderField(
                                    R.always(material.isInTestMode),
                                    onFieldChange(onChange, value, index)
                                )}
                            </Cell>
                            <Cell>
                                <ActionItem
                                    onSelect={() => onChange(value.filter(materialInArray => materialInArray.word.name !== material.word.name))}>
                                    <Icon name="trash"/>
                                </ActionItem>
                            </Cell>
                        </Row>
                    ))}
                </Table>
            </View>
            <AddButton onPress={() => onWordAddClick(
                resources.filter(({name}) => !R.contains(name, value.map(R.path(['word', 'name'])))),
                R.pipe(
                    createNewMaterial(materialModel),
                    R.append(R.__, value),
                    onChange
                ))}>
                <Text>Dodaj</Text>
            </AddButton>
        </View>
        <View style={styles.detailsContainer}>
            <ScrollView styles={styles.scrollView}>
                <Text>DUPA2</Text>
            </ScrollView>
        </View>
    </View>
)

const mapStateToProps = (state, {materialModel}) => ({
    resources: materialModel.fields.word.props.model.mapStateToList(state)
})

const MaterialsArrayInput = connect(mapStateToProps)(_MaterialsArrayInput)

export const MaterialsArrayField = (materialModel) => Field(MaterialsArrayInput, {
    def: [],
    materialModel: Model("Material", materialModel)
})()
