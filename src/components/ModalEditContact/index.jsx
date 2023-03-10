import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../api";
import { Context } from "../../context"
import * as yup from "yup"
import "./style.css"


const ModalEditContact = () => {
    const {setIsModal, idContact} = useContext(Context)

    const token = localStorage.getItem("authToken")

    const schemaUpdate = yup.object().shape({
        name: yup.string(),
        email: yup.string().email("Email inválido"),
        phone: yup.string(),
    });

    const onUpdate = (data) => {
        if(data.name === "") {
            delete data.name
        }
        if(data.email === "") {
            delete data.email
        }
        if(data.phone === "") {
            delete data.phone
        }
        
        api
          .patch(`/contacts/${idContact}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            toast.success("Contato atualizado!");
            setIsModal(false)
          })
          .catch((err) => {
            console.log(err);
            if(err.response.data.message === "Contact already exists") {
                toast.error("Contato já cadastrado!")
            }
            // toast.error("Erro ao atualizar!")
          });
      };

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaUpdate),
    });

    return (
            <div className="divModal">
                <form className="formModalUpdate" onSubmit={handleSubmit(onUpdate)}>
                        <h3>Editar contato</h3>
                        <input type="text" placeholder="  Nome" {...register("name")}/>
                        <p className="pError">{errors.name?.message}</p>

                        <input type="text" placeholder="  Email" {...register("email")}/>
                        <p className="pError">{errors.email?.message}</p>

                        <input type="text" placeholder="  Telefone" {...register("phone")}/>
                        <p className="pError">{errors.phone?.message}</p>

                        <div className="divButtons">
                            <button type="submit">
                                Salvar Alteracão
                            </button>
                            <button onClick={() => setIsModal(false)}>
                                Fechar
                            </button>
                        </div>
                </form>
            </div>
    )
}

export default ModalEditContact