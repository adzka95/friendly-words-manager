import React from "react"
import {Body, Button, Container, Content, Header, Icon, Left, Right, Title} from "native-base"

export const ListPage = ({onBack, title, children}) =>
    <Container>
        <Header>
            <Left>
                <Button transparent onPress={onBack}>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body>
            <Title>{title}</Title>
            </Body>
            <Right/>
        </Header>

        <Content keyboardShouldPersistTaps="handled">
            {children}
        </Content>
    </Container>
