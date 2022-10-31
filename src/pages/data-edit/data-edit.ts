import {Block} from "../../core";
import "./data-edit.css"
import {validateForm} from "../../helpers/validateForm";
import {withStore} from "../../core/Store";
import AuthController from "../../controllers/AuthController";
import UsersController from "../../controllers/UsersController";
import {ChangeData} from "../../api/UsersAPI";

export class DataEditPageBase extends Block {
    constructor() {
        super();
        AuthController.fetchUser();
        this.setProps({
            error: '',
            values:{
                email: '',
                first_name: '',
                second_name: '',
                phone: '',
                login: '',
                display_name: '',
            },
            onSave: () => {
                const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement;
                const nameEl = this.element?.querySelector('input[name="first_name"]') as HTMLInputElement;
                const surnameEl = this.element?.querySelector('input[name="second_name"]') as HTMLInputElement;
                const phoneEl = this.element?.querySelector('input[name="phone"]') as HTMLInputElement;
                const emailEl = this.element?.querySelector('input[name="email"]') as HTMLInputElement;
                const displayNameEl = this.element?.querySelector('input[name="display_name"]') as HTMLInputElement;

                const errorMessage = validateForm([
                    {type: 'login', value: loginEl.value},
                    {type: 'first_name', value: nameEl.value},
                    {type: 'second_name', value: surnameEl.value},
                    {type: 'phone', value: phoneEl.value},
                    {type: 'email', value: emailEl.value},
                ]);
                this.setProps({
                    error: errorMessage || "",
                    values:{
                        login: loginEl.value,
                        email: emailEl.value,
                        first_name: nameEl.value,
                        second_name: surnameEl.value,
                        phone: phoneEl.value,
                        display_name: displayNameEl.value,
                    }
                });

                //if(!errorMessage) {
                    const data = this.props.values;
                    console.log(data);
                    UsersController.changedata(data as ChangeData);
                //}
            },
            onSubmit: () => {
                const host = 'https://ya-praktikum.tech';
                const myUserForm = document.getElementById('myUserForm');

                console.log(myUserForm);

                const avatar = document.getElementById('avatar');
                const form = new FormData(myUserForm);
                fetch(`${host}/api/v2/user/profile/avatar`, {
                    method: 'PUT',
                    credentials: 'include', // Нам нужно подставлять cookies
                    mode: 'cors', // Работаем с CORS
                    body: form,
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        return data;
                    });
            }
        })
    }

    render(){
        //language=hbs
        return `
        <div>
        <div class="back-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 19" fill="none" stroke="#999999"
        stroke-width="3" stroke-linecap="butt" stroke-linejoin="arcs">
        <path d="M15 18l-6-6 6-6" />
    </svg>
    <a href="/profile" class="back-btn" style="color: #999">
        Назад
    </a>
    </div>

    <div class="profile-container">
        <div class="profile">
            <div class="avatar-wrap">
<!--                {{{ AvatarInput }}}-->
            <form id="myUserForm">
                <input id="avatar" type="file" name="avatar" accept="image/*">
                <input type="submit">
           {{{Button text="загрузить аватар"
                     onClick=onSubmit
                     type="submit"
           }}}
            </form>
            </div>
            <div class="name-wrap">
                <p class="name">
                    <b>
                        Екатерина
                    </b>
                </p>
            </div>
            <div class="wrap">
                {{{ControllerInput
                        type="text"
                        name="email"
                        placeholder="Введите email"
                        onInput=onInput
                        onFocus=onFocus
                        label="Email"
                        value="${this.props.email}"
                        ref="emailControllerInputRef"
                }}}
                {{{ControllerInput
                        type="text"
                        name="login"
                        placeholder="Введите логин"
                        onInput=onInput
                        onFocus=onFocus
                        label="Логин"
                        value="${this.props.login}"
                        ref="loginControllerInputRef"
                }}}
                {{{ControllerInput
                        type="text"
                        name="display_name"
                        placeholder="Введите имя в чате"
                        onInput=onInput
                        onFocus=onFocus
                        label="Имя в чате"
                        value="${this.props.display_name}"
                        ref="displayNameControllerInputRef"
                }}}
                {{{ControllerInput
                        type="text"
                        name="first_name"
                        placeholder="Введите имя"
                        onInput=onInput
                        onFocus=onFocus
                        label="Имя"
                        value="${this.props.first_name}"
                        ref="nameControllerInputRef"
                }}}
                {{{ControllerInput
                        type="text"
                        name="second_name"
                        placeholder="Введите фамилию"
                        onInput=onInput
                        onFocus=onFocus
                        label="Фамилия"
                        value="${this.props.second_name}"
                        ref="surnameControllerInputRef"
                }}}
                {{{ControllerInput
                        type="text"
                        name="phone"
                        placeholder="Введите телефон"
                        onInput=onInput
                        onFocus=onFocus
                        label="Телефон"
                        value="${this.props.phone}"
                        ref="phoneControllerInputRef"
                }}}
            </div>
        </div>

        <div class="save-btn-wrap">
<!--            <a href="/profile" style="color:#fff" class="save-btn">-->
<!--                Сохранить-->
<!--            </a>-->
            {{{Button text="Сохранить" onClick=onSave}}}
        </div>
    </div>        
</div>
        `
    }
}

const withUser = withStore((state) => ({ ...state.user }));
export const DataEditPage = withUser(DataEditPageBase);