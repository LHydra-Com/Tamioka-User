import React, { useState } from 'react';
import { View } from 'react-native';
import Text from './ui/Text';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { EditScreenInfo } from './EditScreenInfo';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import Card from './ui/Card';
import Alert from './ui/Alert';
import { Modal } from './ui/Modal';
import Select from './ui/Select';
import { Toggle } from './ui/Toggle';
import Avatar from './ui/Avatar';
import { useTheme } from '../lib/theme';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [switchValue, setSwitchValue] = useState(true);

  const { mode, toggleMode } = useTheme();

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = ['Delete', 'Save', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            console.log('Delete pressed');
            break;
          case 1:
            console.log('Save pressed');
            break;
          case 2:
          default:
            console.log('Cancelled');
        }
      }
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-green-300">
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />

      <EditScreenInfo path={path} />
      <Avatar size={50} imageUri="https://example.com/avatar.jpg" borderColor="border-green-500" />

      <Button title="Show Alert" onPress={() => setShowAlert(true)} />

      <Button title="Open Action Sheet" onPress={openActionSheet} className="mt-4" />

      <Select
        options={['Option 1', 'Option 2', 'Option 3']}
        selected={selectedOption}
        onSelect={setSelectedOption}
        placeholder="Choose an option"
        className="mt-4"
      />

      <Checkbox checked={isChecked} onChange={setIsChecked} label="Check me" className="mt-4" />

      <Toggle value={switchValue} onValueChange={setSwitchValue} className="mt-4" />

      <View className="flex-row items-center mt-4">
        <Text className="text-base mr-2 text-black dark:text-white">Dark Mode</Text>
        <Toggle value={mode === 'dark'} onValueChange={() => toggleMode()} />
      </View>

      <Card title="Modal Example" className="mt-4 w-4/5">
        <Button title="Open Modal" onPress={() => setShowModal(true)} className="mt-2" />
      </Card>

      {showAlert && <Alert message="This is an alert message!" type="info" />}

      <Modal visible={showModal} title="Modal Title" onClose={() => setShowModal(false)}>
        <Text className="mb-4">This is the modal content.</Text>
        <Button title="Close Modal" onPress={() => setShowModal(false)} />
      </Modal>

      {children}
    </View>
  );
};

const styles = {
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};