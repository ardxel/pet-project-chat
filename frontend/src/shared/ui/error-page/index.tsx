export const BaseErrorPage = () => {
  return (
    <div className='main bg-aside-bg flex justify-center items-center'>
      <div className='rounded-md p-4 bg-bg flex flex-col'>
        <h1 className='text-center mb-2'>Oos! Server Error</h1>
        <p>Please accept our apologies.</p>
        <p>The bug has already been reported to the developers and will be fixed soon.</p>
        {/* TODO изменить логику перенаправления при нажатии на ссылку */}
        <a
          data-testid='error-redirect'
          href='/'
          className='mx-auto text-heading-color rounded-md mt-5 font-bold py-3 px-4 bg-btn-bg'>
          Return to main
        </a>
      </div>
    </div>
  );
};
