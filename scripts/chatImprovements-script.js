#chat .body {
    width: 265px;
    height: 200px;
    margin-left: 20px;
    margin-top: 5px;
    margin-bottom: 15px;
    cursor: default;
}
#chat .content {
    font-family: verdana;
    font-size: 10pt;
    width: 0;
    pointer-events: none;
    transition: width .3s .2s;
    background: none;
}
#chat form {
    border-radius: 3px;
    background-color: #c5c5c5;
    pointer-events: auto;
    animation-name: chatsend;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-direction: normal;
    animation-iteration-count: infinite;
}
#chat.opening .content, #chat.open .content {
    width: 265px;
    transition: width .250s;
    display: flex;
    flex-direction: column-reverse;
    background: #bfbfbf75;
    border-radius: 3px;
}
#chat.opening textarea, #chat.open textarea {
    width: 235px;
    opacity: 1;
    cursor: inherit;
}
#chat textarea {
    font-family: 'Arial';
    font-weight: bold;
    position: relative;
    left: 5px;
    width: 0;
    min-height: 16px !important;
    opacity: 0;
    margin: 0;
    padding: 1px 2px;
    border: none !important;
    outline: none !important;
    overflow-y: hidden;
    resize: none;
    background: none;
    cursor: default;
}
