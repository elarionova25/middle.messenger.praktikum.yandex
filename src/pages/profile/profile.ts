import {Block} from "../../core";
import './profile.css';
import AuthController from "../../controllers/AuthController";
import {withStore} from "../../core/Store";

export class ProfilePageBase extends Block {
    static componentName = 'ProfilePage';

    constructor() {
        super();
        AuthController.fetchUser();
        this.setProps({
            onLogout:() => {
                AuthController.logout();
            }
        })
    }

    // language=hbs
    render() {
        return `
            <div class="container">
                <div class="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 19" fill="none" stroke="#999999"
                         stroke-width="3" stroke-linecap="butt" stroke-linejoin="arcs">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    <a href="./" class="back-btn" style="color: #999">
                        Назад
                    </a>
                </div>
                <div class="profile-container">
                    <div class="profile">
                        <div class="avatar-wrap">
                            {{#if avatar}}
                                <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="avatar" class="profile-img">
                            {{else}}
                                <img src="https://archive.org/download/no-photo-available/no-photo-available.png" alt="avatar" class="profile-img">
                            {{/if}}
                        </div>
                        <div class="name-wrap">
                            <p class="name">
                                <b>
                                    {{first_name}}
                                </b>
                            </p>
                        </div>
                        <div class="wrap">
                            <div class="info-wrap">
                                <p class="info-label">
                                    Почта
                                </p>
                                <p class="info">
                                    {{email}}
                                </p>
                            </div>
                            <div class="info-wrap">
                                <p class="info-label">
                                    Логин
                                </p>
                                <p class="info">
                                    {{login}}
                                </p>
                            </div>
                            <div class="info-wrap">
                                <p class="info-label">
                                    Имя
                                </p>
                                <p class="info">
                                    {{first_name}}
                                </p>
                            </div>
                            <div class="info-wrap">
                                <p class="info-label">
                                    Фамилия
                                </p>
                                <p class="info">
                                    {{second_name}}
                                </p>
                            </div>
                            <div class="info-wrap">
                                <p class="info-label">
                                    Имя в чате
                                </p>
                                <p class="info">
                                    {{display_name}}
                                </p>
                            </div>
                            <div class="info-wrap">
                                <p class="info-label">
                                    Телефон
                                </p>
                                <p class="info">
                                    {{phone}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="links-container">
                        <div class="settings-link">
                            <a href="/data-edit">Изменить данные</a>
                        </div>
                        <div class="settings-link">
                            <a href="/password-change">Изменить пароль</a>
                        </div>
                        <div class="settings-link">
                            {{{Button text="Выйти" 
                                      onClick=onLogout
                                      style="button__button"
                            }}} 
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);