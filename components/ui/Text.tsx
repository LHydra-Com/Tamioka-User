import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../lib/theme';

type Variant = 'title' | 'body' | 'label' | 'caption';
type Weight = 'regular' | 'medium' | 'bold';
type Size = 'sm' | 'md' | 'lg' | number;

export interface TextProps extends RNTextProps {
    variant?: Variant;
    weight?: Weight;
    size?: Size;
    color?: string;
    center?: boolean;
    uppercase?: boolean;
    style?: StyleProp<TextStyle>;
}

const SIZE_MAP: Record<Variant, number> = {
    title: 20,
    body: 16,
    label: 14,
    caption: 12,
};

const WEIGHT_MAP: Record<Weight, TextStyle['fontWeight']> = {
    regular: '400',
    medium: '500',
    bold: '700',
};

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, TextProps>(
    (
        {
            variant = 'body',
            size,
            weight = 'regular',
            color,
            center = false,
            uppercase = false,
            style,
            children,
            ...rest
        }: TextProps,
        ref,
    ) => {
        const { mode } = useTheme();

        const defaultColor = color ?? (mode === 'dark' ? '#FFFFFF' : '#0A0A0A');
        const computedSize =
            typeof size === 'number' ? size : size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : SIZE_MAP[variant];

        const textStyle: TextStyle = {
            color: defaultColor,
            fontSize: computedSize,
            textAlign: center ? 'center' : undefined,
            textTransform: uppercase ? 'uppercase' : undefined,
            fontWeight: WEIGHT_MAP[weight],
        };

        return (
            <RNText ref={ref} {...rest} accessibilityRole="text" style={[textStyle, style]}>
                {children}
            </RNText>
        );
    },
);

export default Text;
