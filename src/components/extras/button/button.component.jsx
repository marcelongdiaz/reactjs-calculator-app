const Button = (props) => {

    const {type, label, value, className, onClick} = props;

    const onclickHandler = () => {
        onClick(type, value);
    }

    return(
        <button className={className} onClick={onclickHandler}>{ label }</button>
    )
}

export default Button;