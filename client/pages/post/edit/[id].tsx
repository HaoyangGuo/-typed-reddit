import React from "react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Link from "next/link";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/useIsAuth";
import {
	usePostQuery,
	useUpdatePostMutation,
} from "../../../generated/graphql";
import NavBar from "../../../components/NavBar";

type updatePostFormValues = {
	title: string;
	text: string;
};

const UpdatePost: NextPage<{}> = () => {
	useIsAuth();

	const router = useRouter();
	const intId =
		typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
	const [{ data, fetching, error }] = usePostQuery({
		pause: intId === -1,
		variables: {
			id: intId,
		},
	});
	const [, updatePost] = useUpdatePostMutation();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<updatePostFormValues>({
		defaultValues: {
			title: data?.post?.title,
			text: data?.post?.text,
		},
	});

	const onSubmit: SubmitHandler<updatePostFormValues> = async (values) => {
		await updatePost({ id: intId, title: values.title, text: values.text });
		router.back();
	};

	if (fetching) {
		return (
			<div className="h-screen w-screen flex flex-col">
				<NavBar pageProps={undefined} />
				<div className="h-[calc(100vh-4rem)] w-full flex justify-center items-center">
					Loading...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-screen w-screen flex flex-col">
				<NavBar pageProps={undefined} />
				<h1 className="h-[calc(100vh-4rem)] w-full flex justify-center items-center">
					{error.message}
				</h1>
			</div>
		);
	}

	if (!data?.post) {
		return (
			<div className="h-screen w-screen flex flex-col">
				<NavBar pageProps={undefined} />
				<h1 className="h-[calc(100vh-4rem)] w-full flex justify-center items-center">
					404: Could not find post
				</h1>
			</div>
		);
	}

	return (
		<div className="h-screen">
			<div className="sm:bg-gray-100 h-full">
				<div className="max-w-md mx-auto">
					<div className="pt-28 2xl:pt-32 mb-5">
						<h2 className="mt-6 text-center text-2xl tracking-tight text-gray-900 font-medium">
							Edit Post
						</h2>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="sm:shadow sm:overflow-hidden sm:rounded-md">
							<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-3 gap-6">
									<div className="col-span-3">
										<label
											htmlFor="title"
											className="block text-sm font-medium text-gray-700"
										>
											Title
										</label>
										<div className="mt-1 flex rounded-md shadow-sm">
											<input
												{...register("title", {
													required: {
														value: true,
														message: "please enter a title",
													},
												})}
												type="text"
												name="title"
												id="title"
												className="block w-full flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
											/>
										</div>
									</div>
								</div>

								<div>
									<label
										htmlFor="text"
										className="block text-sm font-medium text-gray-700"
									>
										Text
									</label>
									<div className="mt-1">
										<textarea
											{...register("text", {
												required: {
													value: true,
													message: "please enter some text",
												},
											})}
											id="text"
											name="text"
											rows={3}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
										/>
									</div>
									<p className="mt-2 text-sm text-gray-500">
										Additional information (such as source, etc.) of the meme.
									</p>
								</div>
							</div>
							<div className="px-6 py-1 bg-white w-full">
								{errors.title && (
									<p className="text-orange-700 h-min flex items-center gap-2">
										<ExclamationCircleIcon className="w-5 h-5" />
										<span>{errors.title.message}</span>
									</p>
								)}
								{errors.text && (
									<p className="text-orange-700 h-min flex items-center gap-2">
										<ExclamationCircleIcon className="w-5 h-5" />
										<span>{errors.text.message}</span>
									</p>
								)}
							</div>
							<div className="sm:bg-gray-50 px-4 py-4 text-right sm:px-6">
								{!isSubmitting && (
									<Link
										href={`/post/${encodeURIComponent(intId)}`}
										className="inline-flex justify-center rounded-full border border-orange-600 py-2 w-28 text-sm font-medium text-orange-600 mr-4"
									>
										<span>Cancel</span>
									</Link>
								)}
								{!isSubmitting ? (
									<button
										type="submit"
										disabled={isSubmitting}
										className="inline-flex justify-center rounded-full border border-transparent bg-orange-600 py-2 w-28 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
									>
										<span>Update Post</span>
									</button>
								) : (
									<div className="inline-flex justify-center rounded-full border border-transparent bg-orange-700 py-2 w-28 text-sm font-medium text-white shadow-sm">
										<span>Updating Post...</span>
									</div>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(UpdatePost);
