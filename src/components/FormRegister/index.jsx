import "./style.css"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import * as yup from "yup"
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {

    const navigate = useNavigate();

    const schemaRegister = yup.object().shape({
        name: yup.string().required("Nome é obrigatório"),
        email: yup.string().required("Email obrigatório").email("Email inválido"),
        password: yup.string().required("Senha obrigatória"),
        phone: yup.string().required("Telefone é obrigatório").min(11, 'Deve conter 11 dígitos')
        .max(11, 'Deve conter 11 dígitos'),
    });

    const onRegister = (data) => {
        api
          .post("/clients", data)
          .then((res) => {
            console.log(res);
            toast.success("Usuário criado com sucesso");
            navigate("/login", { replace: true });
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
        <>
        <section className="sectionMainRegister">
            <div className="divH1">
                <h1>Cadastre-se</h1>
            </div>
            <div className="divForm">
                <form onSubmit={handleSubmit(onRegister)} className="formRegister">
                    <input type="text" placeholder="  Nome" {...register("name")}/>
                    <p className="pError">{errors.name?.message}</p>

                    <input type="text" placeholder="  Email" {...register("email")}/>
                    <p className="pError">{errors.email?.message}</p>

                    <input type="password" placeholder="  Senha" {...register("password")}/>
                    <p className="pError">{errors.password?.message}</p>

                    <input type="text" placeholder="  Telefone" {...register("phone")}/>
                    <p className="pError">{errors.phone?.message}</p>

                    <div className="divButton">
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                    <div>
                        <p className="pSemConta">
                            Já possui conta? <a href="/">Entrar</a>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default FormRegister