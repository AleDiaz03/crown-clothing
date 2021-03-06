import { useState, useContext } from "react"
import FormInput from "../form-input/form-input.component"
import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) =>{
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
        }catch(error){
            const errorCode = error.code 
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('No user with this email')
                    break
                default:
                    console.log(error)
            }
        }
        resetFormFields()
    }

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
    }

    return (
        <div>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
            <div className="buttons-container">
                <Button type="submit" onSubmit={handleSubmit}>SIGN IN</Button>
                <Button type='button' onClick={logGoogleUser} buttonType={BUTTON_TYPE_CLASSES.google}>SIGN IN WITH GOOGLE</Button>
            </div>
        </form>
    </div>
    )
}

export default SignInForm