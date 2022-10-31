import Block from '../../core/Block';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  class: string;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return `
    <div class="button-wrap">
        <button class="button__button" type="button">{{text}}</button>
    </div>
    `;
  }
}


