import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps
} from "./article-list-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  adConfig: PropTypes.shape({}).isRequired,
  clientWidth: PropTypes.number,
  count: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number
};

export const defaultProps = {
  ...baseDefaultProps,
  clientWidth: null
};
