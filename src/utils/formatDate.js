const formatDate = (dateString, dateFormat) => {
    const date = new Date(dateString);
    switch (dateFormat) {
      case 'Month, DD YYYY':
        return date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: '2-digit', 
          year: 'numeric' 
        });
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB');
      case 'MM/DD/YYYY':
        return date.toLocaleDateString('en-US');
      default:
        return date.toLocaleDateString();
    }
  };

export default formatDate;