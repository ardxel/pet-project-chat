export const BaseErrorPage = () => {
  return (
    <div className='main flex items-center justify-center bg-aside-bg'>
      <div className='flex flex-col rounded-md bg-bg p-4'>
        <h1 className='mb-2 text-center'>Oos! Server Error</h1>
        <p>Please accept our apologies.</p>
        <p>The bug has already been reported to the developers and will be fixed soon.</p>
        {/* TODO изменить логику перенаправления при нажатии на ссылку */}
        <a
          data-testid='error-redirect'
          href='/'
          className='mx-auto mt-5 rounded-md bg-btn-bg px-4 py-3 font-bold text-heading-color'>
          Return to main
        </a>
      </div>
    </div>
  );
};
