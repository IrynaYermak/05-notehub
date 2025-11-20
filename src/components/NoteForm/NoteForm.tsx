import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { createNote } from '../../services/noteService';
// import type { NoteTag } from '../../types.ts/note';

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Name too short')
    .max(50, 'Name too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Too long note'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm() {
  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    createNote(values);
    actions.resetForm();
  };

  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <fieldset className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </fieldset>

          <fieldset className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </fieldset>

          <fieldset className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </fieldset>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!(isValid && dirty)}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
