import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../api";
import * as yup from "yup"
import { useContext } from "react";
import { Context } from "../../context";
import "./style.css"


const ModalRegisterContact = () => {
    const {setIsModalAdd} = useContext(Context)

    const token = localStorage.getItem("authToken")

    const schemaRegister = yup.object().shape({
        name: yup.string().required("Nome é obrigatório"),
        email: yup.string().required("Email obrigatório").email("Email inválido"),
        phone: yup.string().required("Telefone é obrigatório").min(11, 'Deve conter 11 dígitos')
        .max(11, 'Deve conter 11 dígitos'),
    });

    const onRegisterContact = (data) => {
        api
          .post(`/contacts`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res);
            toast.success("Contato adicionado!");
            setIsModalAdd(false)
          })
          .catch((err) => {
            err.response.data.message === "this client already exists" &&
              toast.error("Email já cadastrado");
          });
      };

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaRegister),
    });

    return (
        <div className="divModalCreate">
                <form className="formModalCreate" onSubmit={handleSubmit(onRegisterContact)}>
                        <h3>Adicionar contato</h3>
                        <input type="text" placeholder="  Nome" {...register("name")}/>
                        <p className="pError">{errors.name?.message}</p>

                        <input type="text" placeholder="  Email" {...register("email")}/>
                        <p className="pError">{errors.email?.message}</p>

                        <input type="text" placeholder="  Telefone" {...register("phone")}/>
                        <p className="pError">{errors.phone?.message}</p>

                        <div className="divButtons">
                            <button type="submit">
                                Adicionar
                            </button>
                            <button onClick={() => setIsModalAdd(false)}>
                                Fechar
                            </button>
                        </div>
                </form>
            </div>
    )
}

export default ModalRegisterContact