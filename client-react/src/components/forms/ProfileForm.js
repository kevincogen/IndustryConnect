import { useFormik } from "formik";

const ProfileForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: initialValues.first_name || "",
      last_name: initialValues.last_name || "",
      email: initialValues.email || "",
      authentication_id: initialValues.authentication_id || "",
      bio: initialValues.bio || "",
      education: initialValues.education || "",
      experience: initialValues.experience || "",
      linkedin: initialValues.linkedin || "",
      twitter: initialValues.twitter || "",
      github: initialValues.github || "",
      facebook: initialValues.facebook || "",
      website: initialValues.website || "",
    },
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <label>
        First Name:
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </label>
      <label>
        Bio:
        <input
          type="text"
          placeholder="Tell us about yourself"
          id="bio"
          name="bio"
          onChange={formik.handleChange}
          value={formik.values.bio}
        />
      </label>
      <label>
        Education:
        <input
          type="text"
          placeholder="Where did you go to school?"
          id="education"
          name="education"
          onChange={formik.handleChange}
          value={formik.values.education}
        />
      </label>
      <label>
        Experience:
        <input
          type="text"
          placeholder="What is your professional title?"
          id="experience"
          name="experience"
          onChange={formik.handleChange}
          value={formik.values.experience}
        />
      </label>
      <label>
        LinkedIn:
        <input
          type="text"
          placeholder="LinkedIn URL"
          id="linkedin"
          name="linkedin"
          onChange={formik.handleChange}
          value={formik.values.linkedin}
        />
      </label>
      <label>
        Twitter:
        <input
          type="text"
          placeholder="Twitter URL"
          id="twitter"
          name="twitter"
          onChange={formik.handleChange}
          value={formik.values.twitter}
        />
      </label>
      <label>
        Github:
        <input
          type="text"
          placeholder="Github URL"
          id="github"
          name="github"
          onChange={formik.handleChange}
          value={formik.values.github}
        />
      </label>
      <label>
        Facebook:
        <input
          type="text"
          placeholder="Facebook URL"
          id="facebook"
          name="facebook"
          onChange={formik.handleChange}
          value={formik.values.facebook}
        />
      </label>
      <label>
        Website:
        <input
          type="text"
          placeholder="Personal Website URL"
          id="website"
          name="website"
          onChange={formik.handleChange}
          value={formik.values.website}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
