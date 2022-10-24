import Block from '../../core/Block';

import './simple-input.css';

interface SimpleInputProps {
    onChange?: () => void;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    error?: string;
    name?: string;
    label?: string;
}

export class SimpleInput extends Block {
    constructor({onChange = () => {}, ...props}: SimpleInputProps) {
        super({...props, events: {input: onChange}});
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
          <input class="text-field__input" name="{{name}}" id="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">
          <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `
    }
}