import React, { useEffect, useState } from "react";
import { Input, Button, RTE, Select } from "./Index";
import { useForm } from "react-hook-form";
import postDbObj from "../Appwrite/Database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { motion } from "framer-motion";

const AddPost = ({ postEditData }) => {
  console.log("DATA FROM EDIT FORM", postEditData);

  const { register, handleSubmit, control, getValues, reset } = useForm({
    defaultValues: {
      title: postEditData?.title || "",
      email: postEditData?.email || "",
      phone: postEditData?.phone || "",
      address: postEditData?.address || "",
      description: postEditData?.description || "",
      status: postEditData?.status || "active",
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const adPost = async (data) => {
    setLoading(true);
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

        data.userid = userdata.$id;
        data.image = fileIdArr;

        const file = await postDbObj.CreatePost(data);
        if (file) {
          navigate(`/viewpost/${file.$id}`);
        }
      } catch (error) {
        setError(error.message);
        reset();
      }
    } else {
      try {
        // Add new Images
        let fileIdArr = [];
        if (data.image[0]) {
          // means user uploaded new file
          let fileCreate;

          for (let i = 0; i < data.image.length; i++) {
            fileCreate = await postDbObj.UploadFile(data.image[i]);
            fileIdArr.push(fileCreate.$id);
          }

          if (fileIdArr.length > 0) {
            // Now delete the old ones
            for (let i = 0; i < postEditData.image.length; i++) {
              await postDbObj.DeleteFile(postEditData.image[i]);
            }
          }
        }

        data.userid = userdata.$id;
        data.image = fileIdArr.length > 0 ? fileIdArr : undefined;
        data.postID = postEditData.$id;

        const file = await postDbObj.UpdatePost(data);
        if (file) {
          navigate(`/viewpost/${file.$id}`);
        }
      } catch (error) {
        setError(error.message);
        reset();
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      <div className="w-full md:w-1/2 mx-auto relative overflow-hidden p-2 mt-4">
        <motion.h2
          className="text-3xl mb-3 text-center font-bold text-cyan-600"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {postEditData ? <p>Edit Post</p> : <p>Add Post</p>}
        </motion.h2>
        <div className="bg-transparent p-6 border-b-4 border-t-4 rounded-3xl border-cyan-600">
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form
            onSubmit={handleSubmit(adPost)}
            className="flex flex-wrap content-center justify-center"
          >
            <motion.div
              className="w-full lg:w-1/2 px-4 md:px-8 lg:px-16"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Input
                label="Post Title :"
                placeholder="Post Title"
                // className="mb-4"
                defaultValue={postEditData?.title || ""}
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
                name="description"
                control={control}
                defaultValue={getValues("description")}
              />
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2 px-4 md:px-8 lg:px-16"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                multiple
                {...register("image", { required: !postEditData })}
              />
              {postEditData && (
                // <div className="w-full mb-4">
                <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group my-4">
                  <img
                    src={postDbObj.PreviewFile(postEditData.image[0])}
                    alt={postDbObj.title}
                    // className="rounded-lg"
                    className="transition-transform border-2 border-cyan-600 rounded-sm  group-hover:scale-110 duration-200 object-cover object-center w-[100%] h-[100%]"
                  />
                </div>
              )}

              <Select
                options={["active", "inactive"]}
                label="Status"
                className="w-full h-10 rounded-md p-2 mb-4 bg-gray-100"
                {...register("status", { required: true })}
              />
              <Button
                type="submit"
                bgColor={postEditData ? "bg-green-500" : undefined}
                className="w-full"
              >
                {postEditData ? "Update" : "Submit"}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </>

    // <div className="w-1/2 mx-auto relative overflow-hidden p-2 mt-4">
    //   <div className="bg-transparent p-6 border-b-4 border-t-4 rounded-3xl ">
    //     <form
    //       onSubmit={handleSubmit(adPost)}
    //       className="flex flex-wrap content-center justify-center"
    //     >
    //       <div className="w-1/2 lg:w-1/2 px-16">
    //         <Input
    //           label="Post Title :"
    //           placeholder="Post Title"
    //           // className="mb-4"
    //           defaultValue={postEditData?.title || ""}
    //           {...register("title", { required: true })}
    //         />
    //         <Input
    //           label="Email :"
    //           placeholder="Email"
    //           className="mb-4"
    //           {...register("email", { required: true })}
    //         />
    //         <Input
    //           label="Phone :"
    //           placeholder="Phone"
    //           className="mb-4"
    //           {...register("phone", { required: true })}
    //         />
    //         <Input
    //           label="Address :"
    //           placeholder="Address"
    //           className="mb-4"
    //           {...register("address", { required: true })}
    //         />
    //         <RTE
    //           label="Description :"
    //           name="description"
    //           control={control}
    //           defaultValue={getValues("description")}
    //         />
    //       </div>
    //       <div className="w-1/2 px-16">
    //         <Input
    //           label="Featured Image :"
    //           type="file"
    //           className="mb-4"
    //           accept="image/png, image/jpg, image/jpeg, image/gif"
    //           multiple
    //           {...register("image", { required: !postEditData })}
    //         />
    //         {postEditData && (
    //           <div className="w-full mb-4">
    //             <img
    //               src={postDbObj.PreviewFile(postEditData.image[0])}
    //               alt={postDbObj.title}
    //               className="rounded-lg"
    //             />
    //           </div>
    //         )}

    //         <Select
    //           options={["active", "inactive"]}
    //           label="Status"
    //           className="w-full h-10 rounded-md p-2 mb-4 bg-gray-100"
    //           {...register("status", { required: true })}
    //         />
    //         <Button
    //           type="submit"
    //           bgColor={postEditData ? "bg-green-500" : undefined}
    //           className="w-full"
    //         >
    //           {postEditData ? "Update" : "Submit"}
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    // <form onSubmit={handleSubmit(adPost)} className="flex flex-wrap mt-4">
    //   <div className="w-2/3 px-2">
    //     <Input
    //       label="Post Title :"
    //       placeholder="Post Title"
    //       className="mb-4"
    //     defaultValue = {postEditData?.title || ""}
    //       {...register("title", { required: true })}
    //     />
    //     <Input
    //       label="Email :"
    //       placeholder="Email"
    //       className="mb-4"
    //       {...register("email", { required: true })}
    //     />
    //     <Input
    //       label="Phone :"
    //       placeholder="Phone"
    //       className="mb-4"
    //       {...register("phone", { required: true })}
    //     />
    //     <Input
    //       label="Address :"
    //       placeholder="Address"
    //       className="mb-4"
    //       {...register("address", { required: true })}
    //     />
    //     <RTE
    //       label="Description :"
    //       //   name="content"
    //       name="description"
    //       control={control}
    //       //   defaultValue={getValues("content")}
    //       defaultValue={getValues("description")}
    //     />
    //   </div>
    //   <div className="w-1/3 px-2">
    //     <Input
    //       label="Featured Image :"
    //       type="file"
    //       className="mb-4"
    //       accept="image/png, image/jpg, image/jpeg, image/gif"
    //       multiple
    //       //   {...register("image", { required: !post })}
    //       {...register("image", { required: !postEditData })}
    //     />
    //                 {postEditData && (
    //                 <div className="w-full mb-4">
    //                     <img
    //                         src={postDbObj.PreviewFile(postEditData.image[0])}
    //                         alt={postDbObj.title}
    //                         className="rounded-lg"
    //                     />
    //                 </div>
    //             )}
    //     {/* {post && (
    //       <div className="w-full mb-4">
    //         <img
    //           src={blogDatabaseObj.PreviewFile(post.featuredImage)}
    //           alt={post.title}
    //           className="rounded-lg"
    //         />
    //       </div>
    //     )} */}
    //     <Select
    //       options={["active", "inactive"]}
    //       label="Status"
    //       className="mb-4"
    //       {...register("status", { required: true })}
    //     />
    //     <Button
    //       type="submit"
    //       bgColor={postEditData ? "bg-green-500" : undefined}
    //       className="w-full"
    //     >
    //       {postEditData ? "Update" : "Submit"}
    //     </Button>
    //   </div>
    // </form>
  );
};

export default AddPost;
