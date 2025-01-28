const FormikDatePicker = ({ field, form }: any) => {
  return (
    <input
      type="date"
      {...field}
      onChange={(event) => {
        form.setFieldValue(field.name, new Date(event.target.value));
      }}
    />
  );
};

export default FormikDatePicker;
