import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography';
import DocumentsService from 'src/services/DocumentsService';

interface IState {
    url: string
}

interface IProps {
    clicked: boolean
    id: string
    name: string
    type: string
    url: string
}

const Card = styled('div')`
    display: flex;
    flex-flow: row nowrap;
    box-shadow: 1px 2px 1px rgba(0,0,0,.2);
    border-radius: 4px;
    overflow: hidden;
`

const CardTypeFile = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    color: white;
    font-weight: bold;
    width: 25%;
    background-color: #C62828;
`

const CardContent = styled('div')`
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    padding: 1rem;
    padding-bottom: 2rem;
    height: 100px;
    width: 75%;
`

const LinkButton = styled(Link)`
    text-decoration: none
`

const DownloadButton = styled('a')`
    text-decoration: none
`

class DocumentCard extends React.Component<IProps, IState> {
    public state = {
       url: ""
    }

    public async componentDidMount() {
        const {url} = this.props

        DocumentsService.download(url).then(response => {
            this.setState({
                url: response
            })
        })
    }

    public render(): JSX.Element {
        const {clicked, type, name, id} = this.props
        const {url} = this.state
        return (
            <Grow in={clicked} style={{ marginBottom: '2rem' }}>
                <Grid item={true} xs={6}>
                {
                    (type === 'pdf')
                    ? (
                    <LinkButton to={`/document/${id}`}>
                        <Card>
                            <CardTypeFile>{type.toUpperCase()}</CardTypeFile>
                            <CardContent>
                                <Typography variant="subheading" component="h3">{name}</Typography>
                            </CardContent>
                        </Card>   
                    </LinkButton>
                    )
                    : (
                    <DownloadButton href={url} download={name}>
                        <Card>
                            <CardTypeFile style={
                                (type === 'doc' || type === 'docx')
                                ? { backgroundColor: '#1565C0' }
                                : (type === 'jpg' || type === 'jpeg' || type === 'png' )
                                    ? { backgroundColor: '#E0E0E0', color: '#888' }
                                    : (type === 'pptx')
                                        ? { backgroundColor: '#FFC107' }
                                        : {}
                            }>{type.toUpperCase()}</CardTypeFile>
                            <CardContent>
                                <Typography variant="subheading" component="h3">{name}</Typography>
                            </CardContent>
                        </Card>
                    </DownloadButton>
                    )
                }
                </Grid>
            </Grow>
        )
    }
}

export default DocumentCard
