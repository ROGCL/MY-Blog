import buttonStyles from './button.module.css'

const myButton = (props) => {
  return (
    <div className={buttonStyles.button}>
      {props.iconSlot && props.iconSlot}
      {props.title}
      {props.children && props.children}
    </div>
  )
}

export default myButton
