import { colord } from 'colord';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

const AppBarPressable = ({ linkTo, style, ...props }) => {
  const navigate = useNavigate();

  return (
    <Pressable
      style={({ pressed }) => [
        style,
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
      onPress={() => linkTo && navigate(linkTo)}
      {...props}
    />
  );
};

export default AppBarPressable;
