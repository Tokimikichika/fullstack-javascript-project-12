import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useAddMessage } from '../../service/messagesApi';

const NewMessageForm = ({ channel }) => {
  const username = useSelector((state) => state.auth.username);
  const { t } = useTranslation();
  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const [addMessage,
    { error, isLoading }, // eslint-disable-line
  ] = useAddMessage();

  const f = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }) => {
      const filtered = leoProfanity.clean(body);
      const message = {
        body: filtered,
        channelId: channel.id,
        username,
      };
      addMessage(message);
      f.resetForm();
    },
  });
  return (
    <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          name="body"
          aria-label={t('chat.newMessage')}
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          value={f.values.body}
          onChange={f.handleChange}
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>

  );
};

export default NewMessageForm;
