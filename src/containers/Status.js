import { connect } from 'react-redux';
import Status from '../components/Status';
import { getMostSelling3Products, getTop3Products } from '../ducks/status';

const mapStateToProps = (state, props) => {
    return {
        top: getTop3Products(state, props),
        most: getMostSelling3Products(state, props)
    }
}

export default connect(mapStateToProps)(Status);
