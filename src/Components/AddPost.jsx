import React, { useEffect, useState } from "react";
import { Input, Button, RTE, Select } from "./Index";
import { useForm } from "react-hook-form";
import postDbObj from "../Appwrite/Database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPost = ({ postEditData }) => {
  console.log("DATA FROM EDIT FORM", postEditData);


  const { register, handleSubmit, control, getValues, reset } = useForm({
    defaultValues: {
        title: postEditData?.title || "",
        email: postEditData?.email || "",
        phone: postEditData?.phone || "",
        address: postEditData?.address || "",
        description: postEditData?.description || "",
        status: postEditData?.status || "active"
        // title: "",
        // email: "",
        // phone: "",
        // address: "",
        // description: "",
        // status: "active",
    },
});

/**
 * SO WE CAN MAKE USE OF RESET HOOK TO PUT THE DEFAULT VALUES IN THE USE FORM
 * WHEN THE DATA THAT WE WANT TO PUT TO THE FORM IS FETCHED ASYN THEN MAKE USE OF USEEFFECT TO FETCH THE DATA AND PUT IT THE FIELDS
 * RESET CAN HELP US DO THAT
 */

// useEffect(() => {
//   if (postEditData) {
//     reset({
//       title: postEditData.title || "",
//       email: postEditData.email || "",
//       phone: postEditData.phone || "",
//       address: postEditData.address || "",
//       description: postEditData.description || "",
//       status: postEditData.status || "active",
//     });
//   }
// }, [postEditData, reset]);

const [error, setError] = useState("");
const userdata = useSelector((state) => state.userdata);
const navigate = useNavigate()


  const adPost = async (data) => {
    console.log("Data From AdPost Form SUbmit", data)
    setError("");

    if (!postEditData) {
      try {
        // upload the File in the bucket first
        // loop on Images coz they may be more than 1
        let fileIdArr = [];
        for (let i = 0; i < data.image.length; i++) {
          let id = await postDbObj.UploadFile(data.image[i]);
          fileIdArr.push(id.$id);
        }

        // console.log(fileIdArr)
        // console.log("1 ", data)

        // console.log("Userdata in Add Post ", userdata);
        data.userid = userdata.$id;
        data.image = fileIdArr;

        const file = await postDbObj.CreatePost(data);
        if(file){
          navigate(`/viewpost/${file.$id}`)
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // Add new Images
        let fileIdArr = [];
        if(data.image[0]){  // means user uploaded new file
          let fileCreate;

          for (let i = 0; i < data.image.length; i++) {
            fileCreate = await postDbObj.UploadFile(data.image[i]);
            fileIdArr.push(fileCreate.$id);
          }

          if(fileIdArr.length > 0){
            // Now delete the old ones
            for (let i = 0; i < postEditData.image.length; i++) {
              await postDbObj.DeleteFile(postEditData.image[i]);
            }
          }
        }

        data.userid = userdata.$id;
        data.image = fileIdArr.length > 0 ? fileIdArr : undefined;
        data.postID = postEditData.$id

        const file = await postDbObj.UpdatePost(data);
        if (file) {
          navigate(`/viewpost/${file.$id}`);
      }
      } catch (error) {}
    }
  };

  return (
    <form onSubmit={handleSubmit(adPost)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Post Title :"
          placeholder="Post Title"
          className="mb-4"
        defaultValue = {postEditData?.title || ""}
          {...register("title", { required: true })}
        />
        <Input
          label="Email :"
          placeholder="Email"
          className="mb-4"
          {...register("email", { required: true })}
        />
        <Input
          label="Phone :"
          placeholder="Phone"
          className="mb-4"
          {...register("phone", { required: true })}
        />
        <Input
          label="Address :"
          placeholder="Address"
          className="mb-4"
          {...register("address", { required: true })}
        />
        <RTE
          label="Description :"
          //   name="content"
          name="description"
          control={control}
          //   defaultValue={getValues("content")}
          defaultValue={getValues("description")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          multiple
          //   {...register("image", { required: !post })}
          {...register("image", { required: !postEditData })}
        />
                    {postEditData && (
                    <div className="w-full mb-4">
                        <img
                            src={postDbObj.PreviewFile(postEditData.image[0])}
                            alt={postDbObj.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
        {/* {post && (
          <div className="w-full mb-4">
            <img
              src={blogDatabaseObj.PreviewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )} */}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={postEditData ? "bg-green-500" : undefined}
          className="w-full"
        >
          {postEditData ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AddPost;
