import { Link, useNavigate } from 'react-router-dom'
import { Theme } from '../../components/Theme'
import * as C from './styles'
import { FormAction, useForm } from '../../contexts/FormContext'
import { ChangeEvent, useEffect } from 'react'
import { SelectOption } from '../../components/SelectOption'

export const FormStep2 = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useForm()

    useEffect(() => {
        if(state.name === '') {
            navigate('/')
        } else {
            dispatch({
                type: FormAction.setCurrentStep,
                payload: 2
            })
        }
    }, [])

    const handleNextStep = () => {
        if(state.name !== '') {
            navigate('/step3')
        } else {
            alert("Preencha os dados!")
        }
    }

    const setLevel = (level: number) => {
        dispatch({
            type: FormAction.setLevel,
            payload: level
        })
    }
 

    return (
        <Theme>
            <C.Container>
                <p>Passo 2/3 </p>
                <h1>{state.name}, o que melhor descreve você?</h1>
                <p>Escolha a opção que melhor condiz com seu estado atual, profissionalmente.</p>

                <hr />

                <SelectOption 
                    title="Sou iniciante"
                    description="Comecei"
                    icon="🥳"
                    selected={state.level === 0}
                    onClick={()=>setLevel(0)}
                />
                <SelectOption 
                    title="Sou programador"
                    description="Já programo ha 2 anos ou mais"
                    icon="😎"
                    selected={state.level === 1}
                    onClick={()=>setLevel(1)}
                />

                <Link to='/' className='backButton'>Voltar</Link>
                <button onClick={handleNextStep}>Proximo</button>
            </C.Container>
        </Theme>   
    )
}