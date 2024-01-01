interface ButtonProps {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  border?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default Button;
