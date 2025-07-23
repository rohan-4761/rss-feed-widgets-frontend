const getTextAlignmentClass = (textAlignment) => {
    switch (textAlignment) {
      case 'AlignJustify':
        return 'text-justify';
      case 'AlignCenter':
        return 'text-center';
      case 'AlignRight':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

export default getTextAlignmentClass;