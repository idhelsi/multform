import { useNavigate, Link } from 'react-router-dom'
import { Theme } from '../../components/Theme'
import * as C from './styles'
import { FormAction, useForm } from '../../contexts/FormContext'
import { ChangeEvent, useEffect } from 'react'


export const FormStep3 = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useForm()

    useEffect(() => {
        if(state.name === '') {
            navigate('/')
        } else {
            dispatch({
                type: FormAction.setCurrentStep,
                payload: 3
            })
        }
    }, [])

    const handleNextStep = () => {
       if(state.email !== '' && state.github !== '') {
            console.log(state)
        } else {
            alert("Preencha os dados");
        }
    }

    const handleeEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormAction.setEmail,
            payload: e.target.value
        })
    }

    const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormAction.setGithub,
            payload: e.target.value
        })
    }

    return (
        <Theme>
            <C.Container>
                <p>Passo 3/3 </p>
                <h1>Legal {state.name}, onde te achamos?</h1>
                <p>Preencha com seus contatos para conseguirmos entra em contato.</p>

                <hr />

                <label>
                    Qual seu e-mail?
                    <input 
                        type="email" 
                        autoFocus
                        value={state.email}
                        onChange={handleeEmailChange}
                    />
                </label>
                <label>
                    Qual seu GitHub?
                    <input 
                        type="url" 
                        autoFocus
                        value={state.github}
                        onChange={handleGithubChange}
                    />
                </label>

                <Link to='/step2' className='backButton'>Voltar</Link>
                <button onClick={handleNextStep}>Finalizar cadastro</button>
            </C.Container>
        </Theme>   
    )
}