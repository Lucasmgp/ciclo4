import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
import { Link } from "react-router-dom";

export const ListarServ = () => {

    const [data, setData] = useState([]);//inicialização de array que recebe os dados

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {//função que vai passar o get da api e trazer resposta no consoloe.log
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API !!!'
                })
                //console.log("Erro: sem conexão com a API !!!")
            })
    }

    useEffect(() => { // chama a execução
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div>
                    <h1>Visualizar informações do serviço!</h1>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger"> {status.message}
                    </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center/">
                                    <Link to ={"/listar-pedido/"+item.id}
                                    className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
        // <div>Listar serviços!</div>
    );
};