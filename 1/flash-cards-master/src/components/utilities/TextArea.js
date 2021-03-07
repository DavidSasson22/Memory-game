import React from "react";

class TextArea extends React.Component {
  state = {
    name: "",
    label: "",
    value: "",
    id: "",
    onChange: null,
  };
  handleChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    this.setState({ value: value });
    this.state.onChange(value, inputName);
  };
  componentDidMount = () => {
    this.setState({
      name: this.props.name,
      label: this.props.label,
      value: this.props.value,
      id: this.props.id,
      onChange: this.props.onChange,
    });
  };
  render() {
    const { name, label, id, value } = this.state;
    return (
      <div>
        {/* <label htmlFor={name}>{label}</label> */}
        {/* <br /> */}
        <textarea
          name={name}
          id={id}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextArea;
