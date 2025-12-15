import { Pressable, View, Text } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export default function Checkbox({
    checked,
    onChange,
    label,
    disabled = false,
    className = '',
}: CheckboxProps) {
    return (
        <Pressable
            onPress={() => !disabled && onChange(!checked)}
            className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${className}`}>
            <View
                className={`mr-2 h-5 w-5 items-center justify-center rounded border 
                    ${checked
                        ? 'border-secondary bg-secondary'
                        : 'border-gray-400 bg-tertiary dark:border-neutral-600 dark:bg-neutral-900'
                    }`}>
                {checked && <Check color="white" size={14} />}
            </View>

            {label && <Text className="text-base text-black dark:text-tertiary">{label}</Text>}
        </Pressable>
    );
}