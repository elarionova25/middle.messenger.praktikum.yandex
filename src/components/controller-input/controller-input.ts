import Block from '../../core/Block';
import './controller-input.css';
import {validateForm} from "../../helpers/validateForm";

interface ControllerInputProps {
    onInput?: () => void;
    onFocus?: () => void;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    error?: string;
    name?: string;
    label?: string;
}

export class ControllerInput extends Block {
    static componentName = 'ControllerInput';

    constructor({...props}: ControllerInputProps) {
        super({
            ...props,
            error: '',
            inputValue: '',
            value: props.value,
            onBlur: (e: FocusEvent) => {
                let inputEl = e.target as HTMLInputElement;
                if(inputEl.value){
                    let errorMessage = validateForm( [{type: inputEl.name, value: inputEl.value}]);
                    this.setProps( {
                        error: errorMessage || "",
                        inputValue: inputEl.value,
                    })
                    // @ts-ignore
                    this.refs.inputRef.value= inputEl.value;
                }
            }
        });
    }

    protected render(): string {
        // language=hbs
        return `
      <div class="text-field">
          <div class="label">
              <span>
                  {{label}}:
              </span>
          </div>
          {{#if value}}
              {{{ Input
                      name="{{name}}"
                      type="{{type}}"
                      placeholder="{{placeholder}}"
                      onFocus=onFocus
                      onInput=onInput
                      onBlur=onBlur
                      ref="inputRef"
                      value="{{value}}"
              }}}
              {{else}}
              {{{ Input
                      name="{{name}}"
                      type="{{type}}"
                      placeholder="{{placeholder}}"
                      onFocus=onFocus
                      onInput=onInput
                      onBlur=onBlur
                      ref="inputRef"
              }}}
          {{/if}}
          {{{Error text=error}}}
      </div>
    `
    }
}

