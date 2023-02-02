import "./style.css"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../context";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {

    const {setAuthToken, setUser} = useContext(Context)

    const navigate = useNavigate();

    const signIn = (userData) => {
        api.post("/login", userData)
            .then(res => {
                window.localStorage.clear();
                window.localStorage.setItem("authToken", res.data.token);
                window.localStorage.setItem("idClient", res.data.id);
                setAuthToken(res.data.token)
                setUser(res.data.id)
                toast.success("Bem Vindo!")
                navigate("/home");
            })
            .catch(err => {
                console.log(err)
                toast.error("Email ou senha invalidos!")
            })
    }

    const schemaLogin = yup.object().shape({
        email: yup.string().required("Email obrigatório").email("Email inválido"),
        password: yup.string().required("Senha obrigatória"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schemaLogin),
      });
    
    return (
        <>
        <section className="sectionMainLogin">
            <div className="divH1">
                <h1>Next Lvl</h1>
            </div>
            <div className="divForm">
                <form onSubmit={handleSubmit(signIn)} className="formLogin">
                    <input type="text" placeholder="  Email" {...register("email")}/>
                    <p className="pError">{errors.email?.message}</p>

                    <input type="password" placeholder="  Senha" {...register("password")}/>
                    <p className="pError">{errors.password?.message}</p>

                    <div className="divButton">
                        <button type="submit">
                            Entrar
                        </button>
                    </div>
                    <div>
                        <p className="pSemConta">
                            Ainda não possui conta? <a href="/register">Cadastre-se!</a>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default FormLogin