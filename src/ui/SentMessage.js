function SentMessage({ message }) {
  return (
    <div class="col-start-6 col-end-13 p-3 rounded-none">
      <div class="flex items-center justify-start flex-row-reverse">
        <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
          {message.user}
        </div>
        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 border-2 rounded-none">
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  );
}

export default SentMessage;
