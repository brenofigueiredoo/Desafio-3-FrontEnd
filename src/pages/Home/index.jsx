import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import api from "../../api"
import "./style.css"
import ModalEditContact from "../../components/ModalEditContact";
import { toast } from "react-toastify";
import ModalRegisterContact from "../../components/ModalRegisterContact";

const HomePage = () => {
    const {setAuthToken, setIsModal, isModal, setIdContact, isModalAdd, setIsModalAdd} = useContext(Context)

    const [contacts, setContacts] = useState()
    const [deleteContact, setDeleteContact] = useState()

    const token = localStorage.getItem("authToken")
    
    const navigate = useNavigate()

    const Logout = () => {
        localStorage.clear();
        setAuthToken("");
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        api.get("/contacts", {headers: {Authorization: `Bearer ${token}`}}).then(res => {
            setContacts(res.data)
        }).catch(err => console.log(err))
    }, [deleteContact, isModal, isModalAdd])

    const getModal = (id) => {
        setIsModal(true)
        setIdContact(id)
    }

    return (
      <main className="mainHome">
        <div className="divMain">
            <div className="divHeader">
                <button className="buttonLogout" onClick={() => Logout()}>
                    Sair
                </button>
                <h3 className="h3Contacts">Meus Contatos</h3>
                <button className="buttonAddContact" onClick={() => setIsModalAdd(true)}>
                    Add Contato
                </button>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telefone</th>
                    </tr>
                </tbody>
               {contacts && contacts.map(({id, name, email, phone}, index) => {  
                return (
                    <tbody key={index}>
                        <tr>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td><button className="buttonEditDelete" onClick={() => getModal(id)}>Editar</button></td>
                            <td><button className="buttonEditDelete" onClick={() => api
                                    .delete(`/contacts/${id}`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        setDeleteContact("")
                                        toast.success("Contato deletado!");
                                        setDeleteContact("Deleted")
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        toast.error("Erro ao deletar!")
                                    })}>Apagar</button></td>
                        </tr>
                    </tbody>
                        
                )
               })}
            </table>
            {isModal && <ModalEditContact />}
            {isModalAdd && <ModalRegisterContact />}
        </div>
      </main>
    );
  }

export default HomePage;